import { Component } from '@angular/core';

@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
	selectedImageFile!: File;

	constructor() {}

	onPhotoSelected(photoSelector: HTMLInputElement) {
		const files = photoSelector.files;
		if (!files || !files.length) {
			return;
		}

		this.selectedImageFile = files[0];
		let fileReader = new FileReader();
		fileReader.readAsDataURL(this.selectedImageFile);

		fileReader.addEventListener('loadend', (ev) => {
			let readableString = fileReader.result as string | undefined;
			let postPreviewImage = <HTMLImageElement>(
				document.getElementById('post-preview-image')
			);

			if (postPreviewImage && readableString) {
				postPreviewImage.src = readableString;
			}
		});
	}
}
