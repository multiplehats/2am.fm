export function logger(name: string, logInProduction = false) {
	const colors = {
		debug: 'color: #00b3ff',
		info: 'color: #00ff00',
		error: 'color: #ff0000',
		warn: 'color: #ff9900'
	};

	const log =
		(level: 'debug' | 'error' | 'info' | 'warn') =>
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(message: string, ...optionalParams: unknown[]) => {
			if (import.meta.env.DEV || logInProduction) {
				const showDate = import.meta.env.PROD ? true : false;
				// eslint-disable-next-line no-console
				console[level](
					`%c${name} >> ${showDate ? new Date().toISOString() + ' ' : ''}${message}`,
					colors[level],
					...optionalParams
				);
			}
		};

	return {
		debug: log('debug'),
		info: log('info'),
		error: log('error'),
		warn: log('warn')
	};
}
