import { Component, Input } from '@angular/core';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css'],
})
export class PostComponent {
	@Input() postData!: PostData;
	creatorName!: string;
	creatorDescription!: string;
	firestore = new FirebaseTSFirestore();

	constructor(private dialog: MatDialog) {}

	ngOnInit(): void {
		this.getCreatorInfo();
	}

	onReplyClick() {
		this.dialog.open(ReplyComponent, {data: this.postData.postId});
	}

	getCreatorInfo() {
		this.firestore.getDocument({
			path: ['Users', this.postData.creatorId],
			onComplete: (result) => {
				let userDocument = result.data();
				if (userDocument) {
					this.creatorName = userDocument['publicName'];
					this.creatorDescription = userDocument['description'];
				}
			},
		});
	}
}
