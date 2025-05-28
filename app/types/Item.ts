export interface Itemtype {
  _id: string;
  title: string;
  email: string;
  seller: string;
  file: string;
  profilepic: string;
  content: string;
  price: number;
  location: string;
  latitude: string;
  longitude: string;
  category?: string;
  tags?: string;
  status?: string;
  date_created: string;
}
