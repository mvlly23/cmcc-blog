import { Component } from "@angular/core";
import { Post } from "../types/keystone.interface";
import { KeystoneService } from "../shared/services/keystone.service";
import { CommonModule } from "@angular/common";
import { TopNav } from "../shared/top-nav/top-nav.component";
import { BlogGrid } from "../shared/blog-grid/blog-grid.component";
import { TagButtons } from "../shared/tag-buttons/tag-buttons.component";

@Component({
    selector: 'landing-page',
    templateUrl: './landing.component.html',
    styleUrl: 'landing.component.scss',
    imports: [
        CommonModule,
        TopNav,
        BlogGrid,
        TagButtons,
    ],
})

export class LandingPage {
    publishedPosts: Post[] = [];
    displayedPosts: Post[] = [];
    constructor(keystone: KeystoneService) {
        keystone.getPublishedPosts().then((posts: Post[]) => {
            this.publishedPosts = posts;
            this.displayedPosts = this.publishedPosts;
        });
    }

    tagSelected(posts: Post[]) {
        this.displayedPosts = posts;
    }

    clearTags() {
        this.displayedPosts = this.publishedPosts;
    }
}