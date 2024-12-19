export type Data = {
  industryCode: string;
  industryName: string;
  businesses: Business[];
};

export type Business = {
  businessCategoryCode: string;
  businessCategoryName: string;
  businessCategory: BusinessCategory[];
};

export type BusinessCategory = {
  subcategoryCode: string;
  subcategoryName: string;
  activities: Activity[];
};

export type Activity = {
  code: string;
  name: string;
  trade: string;
};

export type FinancialAct = {
  code: string;
  NAICS: string;
  des: string;
  trade: number;
  fire: number;
  food: number;
  health: number;
  pest: number;
};
