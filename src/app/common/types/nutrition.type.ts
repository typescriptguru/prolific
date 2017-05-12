interface NutritionObjectHitField {
  item_id: string;
  item_name: string;
  brand_id: string;
  brand_name: string;
  nf_serving_size_qty: number;
  nf_serving_size_unit: string;
  nf_calories: number;
  nf_total_fat: number;
}

interface NutritionObjectHit {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  fields: NutritionObjectHitField
}

interface NutritionObject {
  total_hits?: number;
  max_score?: number;
  hits: NutritionObjectHit[]
}

export interface NutritionType {
  id?: string;
  userName?: string;
  nutritionObject: NutritionObject
}
