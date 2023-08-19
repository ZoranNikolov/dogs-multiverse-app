import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from 'src/app/tools/create-post/create-post.component';
import {
	FirebaseTSFirestore,
	Limit,
	OrderBy,
} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
	selector: 'app-post-feed',
	templateUrl: './post-feed.component.html',
	styleUrls: ['./post-feed.component.css'],
})
export class PostFeedComponent {
	firestore = new FirebaseTSFirestore();
	auth = new FirebaseTSAuth();
	posts: PostData[] = [];
	userHasProfile = true;
	private static userDocument: UserDocument | null = null;

	constructor(private dialog: MatDialog, private router: Router) {}

	ngOnInit(): void {
		this.getPosts();
	}

	onCreatePostClick() {
		this.dialog.open(CreatePostComponent);
	}

	// getPosts() {
	// 	this.firestore.listenToCollection({
	// 		name: 'Posts',
	// 		path: ['Posts'],
	// 		where: [new OrderBy('timestamp', 'desc'), new Limit(10)],
	// 		onUpdate: (result) => {
	// 			result.docChanges().forEach((postCommentDoc) => {
	// 				// if (postCommentDoc.type == 'added') {
	// 				// 	this.comments.unshift(<Comment>postCommentDoc.doc.data());
	// 				// }
	// 			});
	// 		},
	// 		// onComplete: (result) => {
	// 		// 	result.docs.forEach((doc) => {
	// 		// 		let post = <PostData>doc.data();
	// 		// 		post.postId = doc.id;
	// 		// 		this.posts.push(post);
	// 		// 	});
	// 		// },
	// 		// onFail: (err) => {
	// 		// 	console.log(err);

	// 		// },
	// 	});
	// }

	// getPosts() {
	// 	this.firestore.getCollection({
	// 		path: ['Posts'],
	// 		where: [new OrderBy('timestamp', 'desc'), new Limit(10)],
	// 		onComplete: (result) => {
	// 			result.docs.forEach((doc) => {
	// 				let post = <PostData>doc.data();
	// 				post.postId = doc.id;
	// 				this.posts.push(post);
	// 			});
	// 		},
	// 		onFail: (err) => {},
	// 	});
	// }

	getPosts() {
		this.firestore.listenToCollection({
			name: 'Posts',
			path: ['Posts'],
			where: [new OrderBy('timestamp', 'desc'), new Limit(10)],
			onUpdate: (result) => {
				this.posts = []; // Clear the existing posts array
				result.docs.forEach((doc) => {
					let post = <PostData>doc.data();
					post.postId = doc.id;
					this.posts.push(post);
				});
			},
			//   onFail: (err) => {},
		});
	}
	getUserProfile() {
		const currentUser = this.auth.getAuth().currentUser;

		if (currentUser) {
			this.firestore.listenToDocument({
				name: 'Getting Document',
				path: ['Users', currentUser.uid],
				onUpdate: (result) => {
					PostFeedComponent.userDocument = result.exists
						? (result.data() as UserDocument)
						: null;
					this.userHasProfile = result.exists;

					// if (PostFeedComponent.userDocument) {
					// 	PostFeedComponent.userDocument.userId = currentUser.uid;
					// 	if (!this.userHasProfile) {
					// 		this.router.navigate(['/']);
					// 	}
					// }
				},
			});
		} else {
			console.log('No current user');
		}
	}
	onLogoutClick() {
		this.auth.signOut();
		this.router.navigate(['/']);
	}
	loggedIn() {
		return this.auth.isSignedIn();
	}
}

export interface PostData {
	comment: string;
	creatorId: string;
	imageUrl?: string;
	postId: string;
}

export interface UserDocument {
	publicName: string;
	description: string;
	userId: string;
}
