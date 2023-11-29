export interface AuditableEntity {
  id: number;
  createdBy: number;
  createdByUser: string;
  createdAt: Date;
  modifiedBy: number;
  modifiedByUser: string;
  modifiedAt: Date;
}
