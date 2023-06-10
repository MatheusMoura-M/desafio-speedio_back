export interface iLinkRequest {
  original_link: string;
  title: string;
}

export interface iLinkResponse extends iLinkRequest {
  id: string;
  shortened_link: string;
  visits: number;
}

export interface iLinkUpdate {
  title?: string;
}

export interface iLinkUpdateResponse extends iLinkResponse {
  user: {
    id: string;
    name: string;
  };
}
