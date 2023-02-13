export interface Artist {
  node: Node;
}

interface Node {
  name: string;
  discogs: Discogs;
}

interface Discogs {
  images: Image[];
  profile: string;
}

interface Image {
  url: string;
}
