import { dayjs } from '$core/dayjs';
import { derived, readable } from 'svelte/store';

export const createClockStore = () => {
	const currentDate = new Date();

	return readable(currentDate, (set) => {
		const update = () => set(new Date());
		const interval = setInterval(update, 1000);

		return () => clearInterval(interval);
	});
};

const clock = createClockStore();

export const currentTime = derived(clock, ($clock) => {
	$clock.toLocaleTimeString();

	return dayjs($clock).format('HH:mm');
});
