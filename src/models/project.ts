export enum ProjectStatus {
  Active,
  Finished,
}

// Project
export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {
    /* this.title = title;
        this.description = description;
        this.people = people;
        this.id = Math.random();
        this.status = "active";*/
  }
}
