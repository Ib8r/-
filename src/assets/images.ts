/**
 * HEAVY DUTY - Verified High-Resolution Industrial Photography Assets
 * Both imported as bundled Vite assets and backed by static public/images fallbacks.
 */
import heroImg from './images/hero_heavy_equipment_1793732613209.jpg';
import rentalImg from './images/service_rental_machinery_1793732625736.jpg';
import salesImg from './images/service_sales_equipment_1793732626400.jpg';
import partsImg from './images/service_spare_parts_1793732626863.jpg';
import maintenanceImg from './images/service_maintenance_workshop_1793732628915.jpg';

// Equipment Category Showcase Photography
import excavatorImg from './images/machinix_hero_excavator_1793210155649.jpg';
import bulldozerImg from './images/equipment_heavy_bulldozer_1793813165757.jpg';
import wheelLoaderImg from './images/machinix_wheel_loader_1793210155855.jpg';
import craneImg from './images/machinix_mobile_crane_1793210156963.jpg';
import truckImg from './images/equipment_transport_truck_1793813167088.jpg';
import dumpTruckImg from './images/equipment_dump_truck_1793814939333.jpg';
import agricultureImg from './images/equipment_agricultural_machinery_1793813166980.jpg';
import generatorImg from './images/machinix_industrial_generator_1793210157128.jpg';

export const IMAGES = {
  hero: heroImg || '/images/hero.jpg',
  rentalService: rentalImg || '/images/rental.jpg',
  salesService: salesImg || '/images/sales.jpg',
  partsService: partsImg || '/images/parts.jpg',
  maintenanceService: maintenanceImg || '/images/maintenance.jpg',

  // Showcase categories - 8 distinct equipment classes
  excavator: excavatorImg || '/images/machinix_hero_excavator_1793210155649.jpg',
  bulldozer: bulldozerImg || '/images/bulldozer.jpg',
  wheelLoader: wheelLoaderImg || '/images/machinix_wheel_loader_1793210155855.jpg',
  crane: craneImg || '/images/machinix_mobile_crane_1793210156963.jpg',
  dumpTruck: dumpTruckImg || '/images/dump_truck.jpg',
  truck: truckImg || '/images/truck.jpg',
  agriculture: agricultureImg || '/images/agriculture.jpg',
  generator: generatorImg || '/images/machinix_industrial_generator_1793210157128.jpg',
};

export const FALLBACK_IMAGES = {
  hero: '/images/hero.jpg',
  rentalService: '/images/rental.jpg',
  salesService: '/images/sales.jpg',
  partsService: '/images/parts.jpg',
  maintenanceService: '/images/maintenance.jpg',

  excavator: '/images/machinix_hero_excavator_1793210155649.jpg',
  bulldozer: '/images/bulldozer.jpg',
  wheelLoader: '/images/machinix_wheel_loader_1793210155855.jpg',
  crane: '/images/machinix_mobile_crane_1793210156963.jpg',
  dumpTruck: '/images/dump_truck.jpg',
  truck: '/images/truck.jpg',
  agriculture: '/images/agriculture.jpg',
  generator: '/images/machinix_industrial_generator_1793210157128.jpg',
};
