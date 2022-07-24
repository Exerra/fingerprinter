// lifted from https://github.com/fingerprintjs/fingerprintjs/blob/ff01390e628cf3f9c5caf22b7349513e78ae5d9d/src/sources/audio.ts

export const enum AudioFingerprint {
	knownToSuspend = "knownToSuspend",
	notSupported = "notSupported",
	timeout = "timeout"
}

const enum InnerErrorName {
	timeout = 'timeout',
	suspended = 'suspended',
}

export default async function () {
	// @ts-ignore

	const audioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext

	if (!audioContext) {
		return AudioFingerprint.notSupported
	}

	const hashFromIndex = 4500
	const hashToIndex = 5000
	const context = new audioContext( 1, hashToIndex, 44100 )

	const oscillator = context.createOscillator()
	oscillator.type = "triangle"
	oscillator.frequency.value = 10000

	const compressor = context.createDynamicsCompressor()
	compressor.threshold.value = -50
	compressor.knee.value = 40
	compressor.ratio.value = 12
	compressor.attack.value = 0
	compressor.release.value = 0.25

	oscillator.connect( compressor )
	oscillator.connect( context.destination )
	oscillator.start( 0 )

	const [ renderPromise, finishRendering ] = startRenderingAudio( context )

	await finishRendering()
	let data = await renderPromise

	return {
		duration: data.duration,
		length: data.length,
		numberOfChannels: data.numberOfChannels,
		sampleRate: data.sampleRate
	}
}

const startRenderingAudio = ( context: OfflineAudioContext ) => {
	const renderTryMaxCount = 3
	const renderRetryDelay = 500
	const runningMaxAwaitTime = 500
	const runningSufficientTime = 5000
	let finalize = () => undefined as void

	const resultPromise = new Promise<AudioBuffer>( ( resolve, reject ) => {
		let isFinalized = false
		let renderTryCount = 0
		let startedRunningAt = 0

		context.oncomplete = ( event ) => resolve( event.renderedBuffer )

		const startRunningTimeout = () => {
			setTimeout( () => {
				reject( makeInnerError( InnerErrorName.timeout ) )
			}, Math.min( runningMaxAwaitTime, startedRunningAt + runningSufficientTime - Date.now() ) )
		}

		const tryRender = () => {
			try {
				context.startRendering()

				switch (context.state) {
					case "running": {
						startedRunningAt = Date.now()
						if (isFinalized) {
							startRunningTimeout()
						}
						break
					}
					case "suspended": {
						if (!document.hidden) {
							renderTryCount++
						}

						if (isFinalized && renderTryCount >= renderTryMaxCount) {
							reject( makeInnerError( InnerErrorName.suspended ) )
						} else {
							setTimeout( tryRender, renderTryCount )
						}
						break
					}
				}
			} catch (e) {
				reject( e )
			}
		}

		tryRender()

		finalize = () => {
			if (!isFinalized) {
				isFinalized = true
				if (startedRunningAt > 0) {
					startRunningTimeout()
				}
			}
		}
	} )

	return [ resultPromise, finalize ] as const
}

const makeInnerError = ( name: InnerErrorName ) => {
	const error = new Error( name )
	error.name = name
	return error
}