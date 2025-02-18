import { Component } from "@angular/core";
import { KeystoneService } from "../shared/services/keystone.service";
import { ActivatedRoute } from "@angular/router";
import { Post } from "../types/keystone.interface";
import { TopNav } from "../shared/top-nav/top-nav.component";
import { BlogGrid } from "../shared/blog-grid/blog-grid.component";
import { TagButtons } from "../shared/tag-buttons/tag-buttons.component";

@Component({
    selector: 'search-page',
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
    imports: [TopNav, BlogGrid, TagButtons],
})

export class SearchPage {
    allPosts: Post[] = [];
    posts: Post[] = [];
    constructor(private keystone: KeystoneService, private route: ActivatedRoute) {
        const searchTerm = this.route.snapshot.params['id'];
        this.keystone.searchPosts(searchTerm).then(response => {
            this.allPosts = response;
            this.posts = this.allPosts;
        });
    }

    tagSelected(selectedPosts: Post[]) {
        if (selectedPosts) {
            this.posts = selectedPosts;
        }
    }

    clearTags() {
        this.posts = this.allPosts;
    }
}