import { Injectable } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";

import { LinkMetaService } from "./linkmeta.service";
import { environment } from "../../../environments/environment";

@Injectable()
export class SeoService {
  private baseURL: String = "";
  constructor(
    private meta: Meta,
    private title: Title,
    private linkMeta: LinkMetaService
  ) {}

  generateTags(config) {
    this.baseURL = environment.canonical;

    // default values
    config = {
      title:
        " Liveely Letterkenny - What's on Letterkenny, Things to Do, Events in Letterkenny",
      description:
        "What's on Letterkenny, things to do and events in Letterkenny, Co.Donegal; browse and publish events for free.",
      image: "favicon.ico",

      baseURL: this.baseURL,
      slug: "",
      ...config
    };

    this.title.setTitle(config.title);
    this.meta.updateTag({ name: "twitter:card", content: "summary" });
    this.meta.updateTag({ name: "twitter:site", content: "@woletterkenny" });
    this.meta.updateTag({
      name: "twitter:creator",
      content: "@woletterkenny"
    });
    this.meta.updateTag({ name: "twitter:title", content: config.title });
    this.meta.updateTag({
      name: "twitter:description",
      content: config.description
    });
    this.meta.updateTag({ name: "twitter:image", content: config.image });
    this.meta.updateTag({
      name: "twitter:url",
      content: `${config.baseURL}/${config.slug}`
    });

    this.meta.updateTag({ property: "og:type", content: "website" });
    this.meta.updateTag({
      property: "og:site_name",
      content: "Liveely Letterkenny"
    });
    this.meta.updateTag({ property: "og:title", content: config.title });
    this.meta.updateTag({ property: "document-base", content: config.baseURL });
    this.meta.updateTag({
      property: "og:description",
      content: config.description
    });
    this.meta.updateTag({
      property: "Description",
      content: config.description
    });
    this.meta.updateTag({ property: "og:image", content: config.image });
    this.meta.updateTag({
      property: "og:url",
      content: `${config.baseURL}/${config.slug}`
    });
    this.linkMeta.removeTag("rel=canonical");
    this.linkMeta.addTag({
      rel: "canonical",
      href: `${config.baseURL}/${config.slug}`
    });
  }
}
