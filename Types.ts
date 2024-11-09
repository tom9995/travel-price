export interface InitialUserState {
  user: null | {
    // userName: string;
    // uid: string;
    // photo: string;
    email: string;
    // displayName: string;
  };
}

export interface InitialPersonState {
  person_id: number | null;
  person_name: string | null;
  created_at: string | null;
}

export interface InitialPriceState {
  price_id: number | null;
  price: number | null;
  price_title: string | null;
  price_detail: string | null;
  created_at: string | null;
  is_paid: boolean | null;
}
