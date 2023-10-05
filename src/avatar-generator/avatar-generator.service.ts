import { Injectable } from '@nestjs/common';

@Injectable()
export class AvatarGeneratorService {

	private generateRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	private generateAvatarUrl(name) {
		const baseUrl = 'https://source.boringavatars.com/marble/120/';
		const encodedName = encodeURIComponent(name);
		const colors = [];
		for (let i = 0; i < 5; i++) {
			colors.push(this.generateRandomColor());
		}
		const colorParam = colors.join(',');
		const url = `${baseUrl}${encodedName}?colors=${colorParam}&square=true`;
		return url;
	}

	generateRandomAvatar(): string {
		return this.generateAvatarUrl('Maria Mitchell')
	}
}
