export class Task {
    private static nextId = 1; 
    public id: number;
    public title: string;
    public description: string;
    public status: string;
    
    public constructor(title: string, description: string, status: string) {
      this.id = Task.nextId++;
      this.title = title;
      this.description = description;
      this.status = status;
    }
  }
  