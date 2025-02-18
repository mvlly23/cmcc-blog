import { AfterContentInit, Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { KeystoneService } from "../services/keystone.service";
import { Post, Tag } from "../../types/keystone.interface";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'tag-buttons',
    templateUrl: './tag-buttons.component.html',
    styleUrl: 'tag-buttons.component.scss',
    imports: [CommonModule],
})

export class TagButtons implements AfterContentInit {
    @Input() usePosts?: boolean = false;
    @Input() posts?: Post[] | undefined;
    @Output() tagSelected: EventEmitter<Post[]> = new EventEmitter();
    @Output() clearTags: EventEmitter<boolean> = new EventEmitter();
    tags: Tag[] = [];
    constructor(private keystone: KeystoneService) {
    }

    ngAfterContentInit(): void {
        if (!this.usePosts) {
            this.keystone.getTags().then((response: Tag[]) => {
                this.tags = response;
                this.tags = Array.from(this.tags).sort((a, b) => (b.postsCount - a.postsCount));
            });
        }
    }

    ngOnChanges(update: SimpleChanges) {
        if (this.usePosts && typeof update["posts"] !== 'undefined' && update['posts'].currentValue) {
            this.populateTagsFromPosts(update["posts"].currentValue);
        }
    }

    populateTagsFromPosts(posts: Post | Post[]) {
        this.tags = [];
        if (Array.isArray(posts)) {
            let tagCopy: Tag[] = [];
            for (const post of posts) {
                tagCopy.push(...post.tags);
            }
            this.tags = Array.from(new Set(tagCopy));
        } else {
            console.log(posts)
            this.tags = [...posts.tags];
        }
    }

    selectedTag(tag: Tag) {
        if (tag.postsCount) {
            if (tag.posts && tag.posts.length)
                this.tagSelected.emit(tag.posts);
            else if(this.posts) {
                const postsWithTag = this.findPostsWithTag(tag);
                this.tagSelected.emit(postsWithTag);
            }
        } else {
            this.tagSelected.emit([]);
        }
    }

    clearTag() {
        this.clearTags.emit(true);
    }

    findPostsWithTag(tag: Tag): Post[] {
        const postsWithTag: Post[] = [];
        for (const post of this.posts!) {
            if (post.tags.find(postTag => tag.name === postTag.name)) {
                postsWithTag.push(post);
            }
        }
        return postsWithTag;
    }
}