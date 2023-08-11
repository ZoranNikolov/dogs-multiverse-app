import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from 'src/app/tools/create-post/create-post.component';

@Component({
	selector: 'app-post-feed',
	templateUrl: './post-feed.component.html',
	styleUrls: ['./post-feed.component.css'],
})
export class PostFeedComponent {
	constructor(private dialog: MatDialog) {}

	onCreatePostClick() {
		this.dialog.open(CreatePostComponent);
	}
}
