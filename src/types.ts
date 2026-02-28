export interface Ticket {
  TicketID: number;
  TicketTitle: string;
  TicketNumber: string;
  TicketPriority: string;
  TicketImpact: string;
  TicketStatus: string;
  TicketSource: string;
  TicketType: string;
  EndUserID: number;
  EndUserEmail: string;
  EndUserFirstName: string;
  EndUserLastName: string;
  EndUserPhone: string;
  CustomerID: number;
  CustomerName: string;
  TechnicianContactID: number;
  TechnicianFullName: string;
  TechnicianEmail: string;
  ContractID: number;
  TicketCreatedDate: string;
  TicketResolvedDate: string;
  FirstComment: string;
  FirstCommentTimestamp: string;
  LastEndUserComment: string;
  LastEndUserCommentTimestamp: string;
  LastTechnicianComment: string;
  LastTechnicianCommentTimestamp: string;
  OnSiteDurationSeconds: number;
  OffSiteDurationSeconds: number;
  OnSiteDurationMinutes: number;
  OffSiteDurationMinutes: number;
}

export interface Customer {
  CustomerID: number;
  CustomerName: string;
  CreatedOn: string;
  LastModified: string;
  BusinessNumber: string;
  Domain: string;
  Address: string;
  City: string;
  State: string;
  Country: string;
  Phone: string;
  Fax: string;
  Notes: string;
  Links: string;
  Longitude: number;
  Latitude: number;
  ZipCodeStr: string;
}

export interface Contact {
  EndUserID: number;
  CustomerID: number;
  CustomerName: string;
  Firstname: string;
  Lastname: string;
  JobTitle: string;
  Email: string;
  Phone: string;
  MobilePhone: string;
  IsContactPerson: boolean;
  InIgnoreMode: boolean;
  CreatedOn: string;
  LastModified: string;
}

export interface Agent {
  AgentID: number;
  DeviceGuid: string;
  CustomerID: number;
  CustomerName: string;
  AgentName: string;
  MachineName: string;
  DomainName: string;
  Online: boolean;
  OS: string;
  OSType: string;
  Processor: string;
  Memory: number;
  IPAddresses: string[];
  Vendor: string;
  VendorBrandModel: string;
  VendorSerialNumber: string;
  Created: string;
  Modified: string;
  ReportedFromIP: string;
}

export interface Alert {
  AlertID: number;
  Code: number;
  Source: string;
  Title: string;
  Severity: string;
  Created: string;
  DeviceGuid: string;
  AdditionalInfo: string;
  Archived: boolean;
  ArchivedDate: string;
  AlertCategoryID: number;
  TicketID: number;
  AlertMessage: string;
  DeviceName: string;
  CustomerID: number;
  CustomerName: string;
}

export interface Contract {
  ContractID: number;
  ContractName: string;
  ContractType: string;
  CustomerID: number;
  CustomerName: string;
  Active: boolean;
  Default: boolean;
  Taxable: boolean;
  StartDate: string;
  EndDate: string;
}

export interface Invoice {
  InvoiceId: string;
  InvoiceNumber: number;
  InvoiceNumberAsString: string;
  Total: number;
  Subtotal: number;
  Tax: number;
  TaxPercentage: number;
  InvoiceDate: string;
  ContractName: string;
  Currency: string;
  PeriodStartDate: string;
  PeriodEndDate: string;
  LineItems: unknown[];
}

export interface KBArticle {
  KBID: number;
  KBTimestamp: string;
  KBContext: string;
  KBProduct: string;
  KBRating_Yes: number;
  KBRating_No: number;
  KBRating_Views: number;
  KBIsPrivate: boolean;
  KBStatus: number;
  KBPriority: number;
  KBKeywords: string;
  KBAddress: string;
}

export interface Department {
  DepartmentID: number;
  Name: string;
  Description: string;
}

export interface Rate {
  RateID: number;
  Amount: number;
  Description: string;
  SKU: string;
  Category: string;
  Archived: boolean;
}

export interface CustomValue {
  ItemId: number;
  FieldName: string;
  ValueAsString: string;
}

export interface CustomField {
  FieldName: string;
  FieldType: string;
  Options: string[];
}
