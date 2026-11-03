/**
 * HEAVY DUTY - Verified High-Resolution Industrial Photography Assets
 * Both imported as bundled Vite assets and backed by static public/images fallbacks.
 */
import heroImg from './images/hero_heavy_equipment_1793732613209.jpg';
import rentalImg from './images/service_rental_machinery_1793732625736.jpg';
import salesImg from './images/service_sales_equipment_1793732626400.jpg';
import partsImg from './images/service_spare_parts_1793732626863.jpg';
import maintenanceImg from './images/service_maintenance_workshop_1793732628915.jpg';

export const IMAGES = {
  hero: heroImg || '/images/hero.jpg',
  rentalService: rentalImg || '/images/rental.jpg',
  salesService: salesImg || '/images/sales.jpg',
  partsService: partsImg || '/images/parts.jpg',
  maintenanceService: maintenanceImg || '/images/maintenance.jpg',
};

export const FALLBACK_IMAGES = {
  hero: '/images/hero.jpg',
  rentalService: '/images/rental.jpg',
  salesService: '/images/sales.jpg',
  partsService: '/images/parts.jpg',
  maintenanceService: '/images/maintenance.jpg',
};
