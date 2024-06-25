import { DataSource, EntityManager } from 'typeorm';
import { AppDataSource } from '../ormconfig';

export default class DatabaseManager {
  private static dataSource: DataSource;

  public static async getDataSource(): Promise<DataSource> {
    if (!DatabaseManager?.dataSource?.isInitialized) {
      try {
        DatabaseManager.dataSource = await AppDataSource.initialize();
      } catch (error) {
        console.error('Error establishing database connection', error);
        throw error;
      }
    }
    return DatabaseManager.dataSource;
  }

  public static async getManager(): Promise<EntityManager> {
    const dataSource = await DatabaseManager.getDataSource();
    return dataSource.manager;
  }

}
