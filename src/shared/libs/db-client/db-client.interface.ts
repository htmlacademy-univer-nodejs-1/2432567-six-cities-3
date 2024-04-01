export interface DBClientInterface {
  connect(uri: string): Promise<void>;
  disconnect(): Promise<void>;
}
