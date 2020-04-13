export interface HeroFormModel {
    heroName: string;
    weapons: WeaponModel[];
}
  
export interface WeaponModel {
    name: string;
    damagePoints: number;
}