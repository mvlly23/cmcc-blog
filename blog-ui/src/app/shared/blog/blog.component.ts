import { Component } from "@angular/core";
import { KeystoneService } from "../services/keystone.service";
import { ActivatedRoute } from "@angular/router";
import { Post, User } from "../../types/keystone.interface";
import { CommonModule } from "@angular/common";
import { TopNav } from "../top-nav/top-nav.component";

@Component({
    selector: 'blog',
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss',
    imports: [TopNav, CommonModule],
})

export class Blog {
    // TODO limit image size
    post!: Post;
    user!: User;
    content!: any[];
    constructor(private keystone: KeystoneService, private route: ActivatedRoute) {
        const id = this.route.snapshot.params['id'];
        keystone.getPostById(id).then((response) => {
            this.post = response[0];
            this.user = this.post.author;
            this.content = this.post.content.document;
        });
    }
}