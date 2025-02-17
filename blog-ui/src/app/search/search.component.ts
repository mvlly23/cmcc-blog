import { Component } from "@angular/core";
import { KeystoneService } from "../shared/services/keystone.service";
import { ActivatedRoute } from "@angular/router";
import { Post } from "../types/keystone.interface";
import { TopNav } from "../shared/top-nav/top-nav.component";
import { BlogGrid } from "../shared/blog-grid/blog-grid.component";

@Component({
    selector: 'search-page',
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
    imports: [TopNav, BlogGrid],
})

export class SearchPage {
    posts: Post[] = [];
    constructor(private keystone: KeystoneService, private route: ActivatedRoute) {
        const searchTerm = this.route.snapshot.params['id'];
        this.keystone.searchPosts(searchTerm).then(response => {
            this.posts = response;
        });
    }
}