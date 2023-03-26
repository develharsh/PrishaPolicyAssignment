import {
  set,
  connections,
  connect,
  Error,
} from "mongoose";

set("strictQuery", false);

class DBConnection {
  private currentEnv: string | undefined = process.env.NODE_ENV;
  public connect(): void {
    // console.log(this.currentEnv);
    if (connections[0].readyState) {
      console.log("Already connected.");
      return;
    }
    connect(
      `${process.env[`DB_${this.currentEnv?.toUpperCase()}`]}/${
        this.currentEnv
      }`,
      (err: Error | null): void => {
        if (err) throw err;
        console.log("Connected to mongodb.");
      }
    );
  }
}

export default DBConnection;
