export interface CloudinaryDirectoryList {
  folders:
  {
    name: string;
    path: string;
  }[];
  next_cursor: string;
  total_count: number;
}

export interface CloudinaryAssets {
  total_count: number;
  time: number;
  resources:
  {
    asset_id: string;
    public_id: string; //"site/svyatie/sergiy-radonezsky_nzt0dw",
    folder: string; // "site/svyatie",
    filename: string;
    format: string;
    version: number;
    resource_type: string;
    type: string;
    created_at: string;
    uploaded_at: string;
    bytes: number;
    backup_bytes: number;
    width: number;
    height: number;
    aspect_ratio: number;
    pixels: number;
    url: string;
    secure_url: string;
    status: string;
    access_mode: string;
    access_control: string;
    etag: string;
    created_by: {
      access_key: string;
      custom_id: string;
      external_id: string;
    },
    uploaded_by: {
      access_key: string;
      custom_id: string;
      external_id: string;
    }
  }[];
}
