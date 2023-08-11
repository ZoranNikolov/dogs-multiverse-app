import { Component, Input } from '@angular/core';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

	@Input() postData!: PostData;
	constructor() { }

}
