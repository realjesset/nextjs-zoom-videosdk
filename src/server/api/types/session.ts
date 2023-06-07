export interface Sessions {
  from: string;
  to: string;
  page_size: number;
  next_page_token: string;
  sessions: Session[] | [];
}

export interface Session {
  id: string;
  session_name: string;
  start_time: string;
  end_time: string;
  duration: string;
  user_count: number;
  has_voip: boolean;
  has_video: boolean;
  has_screen_share: boolean;
  has_recording: boolean;
  has_pstn: boolean;
  session_key: string;
}
