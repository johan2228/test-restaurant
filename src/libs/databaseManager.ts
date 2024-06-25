import { DataSource, EntityManager } from 'typeorm';
import { AppDataSource } from '../ormconfig';

export default class DatabaseManager {
  // Static property to hold the initialized DataSource
  private static dataSource: DataSource;

  // Method to asynchronously fetch or initialize the DataSource
  public static async getDataSource(): Promise<DataSource> {
    // Check if the DataSource has been initialized
    if (!DatabaseManager?.dataSource?.isInitialized) {
      try {
        // Initialize the DataSource if not already initialized
        DatabaseManager.dataSource = await AppDataSource.initialize();
      } catch (error) {
        console.error('Error establishing database connection', error);
        throw error;
      }
    }
    return DatabaseManager.dataSource;
  }

  // Method to asynchronously fetch the EntityManager from the initialized DataSource
  public static async getManager(): Promise<EntityManager> {
    // Fetch the initialized DataSource
    const dataSource = await DatabaseManager.getDataSource();
    // Return the EntityManager from the DataSource
    return dataSource.manager;
  }

}
