import { type User, type InsertUser, type ApartmentRequest, type InsertApartmentRequest, type OwnerApplication, type InsertOwnerApplication } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createApartmentRequest(request: InsertApartmentRequest): Promise<ApartmentRequest>;
  getApartmentRequests(): Promise<ApartmentRequest[]>;
  createOwnerApplication(application: InsertOwnerApplication): Promise<OwnerApplication>;
  getOwnerApplications(): Promise<OwnerApplication[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private apartmentRequests: Map<string, ApartmentRequest>;
  private ownerApplications: Map<string, OwnerApplication>;

  constructor() {
    this.users = new Map();
    this.apartmentRequests = new Map();
    this.ownerApplications = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createApartmentRequest(insertRequest: InsertApartmentRequest): Promise<ApartmentRequest> {
    const id = randomUUID();
    const request: ApartmentRequest = {
      ...insertRequest,
      id,
      status: "new",
      createdAt: new Date(),
      additionalInfo: insertRequest.additionalInfo ?? null,
      messengerType: insertRequest.messengerType,
      messengerContact: insertRequest.messengerContact,
    };
    this.apartmentRequests.set(id, request);
    return request;
  }

  async getApartmentRequests(): Promise<ApartmentRequest[]> {
    return Array.from(this.apartmentRequests.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createOwnerApplication(insertApplication: InsertOwnerApplication): Promise<OwnerApplication> {
    const id = randomUUID();
    const application: OwnerApplication = {
      ...insertApplication,
      id,
      status: "new",
      createdAt: new Date(),
      question: insertApplication.question ?? null,
    };
    this.ownerApplications.set(id, application);
    return application;
  }

  async getOwnerApplications(): Promise<OwnerApplication[]> {
    return Array.from(this.ownerApplications.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
