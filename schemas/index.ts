import { CreateReward, Reward, UpdateReward } from "@/types/reward";
import { array, date, mixed, number, object, Schema, string, ref } from "yup";
import { setLocalizedLocale } from "@/libs/set-localized-locale";
import { Education, Educations } from "@/types/education";
import { Gender, Genders } from "@/types/gender";
import { Region, Regions } from "@/types/region";
import { CandidateType, CandidateTypes } from "@/types/candidate-type";
import { User } from "@/types/user";
import { Role, Roles } from "@/types/role";
import { CreateEntity, Entity, UpdateEntityDetails, UpdateEntityImage } from "@/types/entity";
import { Candidate, CandidateWithoutImage } from "@/types/candidate";
import { CreateForeigner, Foreigner, UpdateForeignerDetails, UpdateForeignerImage } from "@/types/foreigner";
import { CreateMother, Mother, UpdateMotherDetails, UpdateMotherImage } from "@/types/mother";
import { Citizen, CreateCitizen, UpdateCitizenDetails, UpdateCitizenImage } from "@/types/citizen";
import { nameof } from "@/utils/nameof";
import {CreateOffice, Office, UpdateOfficeDetails} from "@/types/office";

// Needs to run first so Yup schemas will have valid keys and options
setLocalizedLocale()

const nullableField = (value: any, originalValue: any) => {
  if (originalValue === '') {
    return null
  }

  return value;
}

const idSchema = number().required().label('Id')
const lastNameSchema = string().required().max(64).label('Last name')
const firstNameSchema = string().required().max(64).label('Last name')
const patronymicNameSchema = string().nullable().max(64).default(null).transform(nullableField).label('Last name')
const pinSchema = string()
  .matches(/^[12].*$/, {message: "ПИН должен начинаться с '1' или '2'"})
  .length(14, "ПИН должен иметь длину 14 цифр")
  .label('Pin');
const passportNumberSchema = string().max(10).uppercase();

const birthDateSchema = date().required().label('Birth date')
const deathDateSchema = date().nullable().default(null).transform(nullableField).label('Death date')
const nameRuSchema = string().required().max(256).label('Name (ru)')
const nameKgSchema = string().required().max(256).label('Name (kg)')
const imageSchema = string().nullable().default(null).transform(nullableField).label('Image')
const imageNameSchema = string().nullable().default(null).transform(nullableField).label('Filename')

const registeredAddressSchema = string().required().max(256).label('Registered address')
const actualAddressSchema = string().nullable().default(null).max(256).transform(nullableField).label('Actual address')
const scienceDegreeSchema = string().nullable().default(null).max(256).transform(nullableField).label('Science degree')

const CandidateTypeSchema = mixed<CandidateType>().oneOf(CandidateTypes.map(x => x.name)).label('Candidate')
const EducationSchema = mixed<Education>().oneOf(Educations.map(x => x.name)).label('Education')
const GenderSchema = mixed<Gender>().oneOf(Genders.map(x => x.name)).label('Gender')
const RegionSchema = mixed<Region>().oneOf(Regions.map(x => x.name)).label('Region')
const RoleSchema = mixed<Role>().oneOf(Roles.map(x => x.name)).label('Role')


const AuditableEntitySchema = object({
  id: idSchema,
  createdBy: number().required().label('Created by'),
  createdByUser: string().required().label('Created by'),
  createdAt: date().required().label('Created at'),
  modifiedBy: number().required().label('Last modified by'),
  modifiedByUser: string().required().label('Last modified by'),
  modifiedAt: date().required().label('Last modified at'),
})

const CandidateSchema: Schema<Candidate> = AuditableEntitySchema.shape({
  candidateType: CandidateTypeSchema.required().label('Candidate'),
  image: imageSchema,
  imageName: imageNameSchema,
})

const CandidateWithoutImageSchema: Schema<CandidateWithoutImage> = AuditableEntitySchema.required().shape({
  name: string().required().label('Name'),
  candidateType: CandidateTypeSchema.required().label('Candidate')
})

const CandidateWithoutImageArraySchema = array().of(CandidateWithoutImageSchema.required()).default([])

const CreateCitizenSchema: Schema<CreateCitizen> = object({
  lastName: lastNameSchema,
  firstName: firstNameSchema,
  patronymicName: patronymicNameSchema,
  pin: pinSchema.required(),
  passportNumber: passportNumberSchema.required(),
  gender: GenderSchema.required(),
  birthDate: birthDateSchema,
  deathDate: deathDateSchema,
  registeredAddress: registeredAddressSchema,
  actualAddress: actualAddressSchema,
  educationId: number().required().min(1).label('Education'),
  scienceDegree: scienceDegreeSchema,
  yearsOfWorkTotal: number().required().label('Years of work in total'),
  yearsOfWorkInIndustry: number().required()
    .max(ref(nameof<CreateCitizen>('yearsOfWorkTotal')))
    .label('Years of work in industry'),
  yearsOfWorkInCollective: number().required()
    .max(ref(nameof<CreateCitizen>('yearsOfWorkInIndustry')))
    .label('Years of work in collective'),
  image: imageSchema,
  imageName: imageNameSchema,
})


const CitizenSchema: Schema<Citizen> = CandidateSchema.required().shape({
  lastName: lastNameSchema,
  firstName: firstNameSchema,
  patronymicName: patronymicNameSchema,
  pin: pinSchema.required(),
  passportNumber: passportNumberSchema.required(),
  gender: GenderSchema.required(),
  birthDate: birthDateSchema,
  deathDate: deathDateSchema,
  registeredAddress: registeredAddressSchema,
  actualAddress: actualAddressSchema,
  educationId: number().required().min(1).label('Education'),
  scienceDegree: scienceDegreeSchema,
  yearsOfWorkTotal: number().required().label('Years of work in total'),
  yearsOfWorkInIndustry: number().required()
    .max(ref(nameof<Citizen>('yearsOfWorkTotal')))
    .label('Years of work in industry'),
  yearsOfWorkInCollective: number().required()
    .max(ref(nameof<Citizen>('yearsOfWorkInIndustry')))
    .label('Years of work in collective'),
})

const UpdateCitizenDetailsSchema: Schema<UpdateCitizenDetails> = object({
  id: idSchema,
  lastName: lastNameSchema,
  firstName: firstNameSchema,
  patronymicName: patronymicNameSchema,
  pin: pinSchema.required(),
  passportNumber: passportNumberSchema.required(),
  gender: GenderSchema.required(),
  birthDate: birthDateSchema,
  deathDate: deathDateSchema,
  registeredAddress: registeredAddressSchema,
  actualAddress: actualAddressSchema,
  educationId: number().required().min(1).label('Education'),
  scienceDegree: scienceDegreeSchema,
  yearsOfWorkTotal: number().required().label('Years of work in total'),
  yearsOfWorkInIndustry: number().required()
    .max(ref(nameof<Citizen>('yearsOfWorkTotal')))
    .label('Years of work in industry'),
  yearsOfWorkInCollective: number().required()
    .max(ref(nameof<Citizen>('yearsOfWorkInIndustry')))
    .label('Years of work in collective'),
})

const UpdateCitizenImageSchema: Schema<UpdateCitizenImage> = object({
  id: idSchema,
  image: string().nullable().default(null).label('Image'),
  imageName: string().defined().label('Filename')
    .when(nameof<UpdateCitizenImage>('image'), {
      is: true,
      then: schema => schema.required(),
      otherwise: schema => schema.nullable().default(null)
    })
})


const CreateMotherSchema: Schema<CreateMother> = object({
  lastName: lastNameSchema,
  firstName: firstNameSchema,
  patronymicName: patronymicNameSchema,
  pin: pinSchema.required(),
  passportNumber: passportNumberSchema.required(),
  birthDate: birthDateSchema,
  deathDate: deathDateSchema,
  registeredAddress: registeredAddressSchema,
  actualAddress: actualAddressSchema,
  image: imageSchema,
  imageName: imageNameSchema,
})

const UpdateMotherDetailsSchema: Schema<UpdateMotherDetails> = object({
  id: idSchema,
  lastName: lastNameSchema,
  firstName: firstNameSchema,
  patronymicName: patronymicNameSchema,
  pin: pinSchema.required(),
  passportNumber: passportNumberSchema.required(),
  birthDate: birthDateSchema,
  deathDate: deathDateSchema,
  registeredAddress: registeredAddressSchema,
  actualAddress: actualAddressSchema,
})

const UpdateMotherImageSchema: Schema<UpdateMotherImage> = object({
  id: idSchema,
  image: string().nullable().default(null).label('Image'),
  imageName: string().defined().label('Filename')
    .when(nameof<UpdateMotherImage>('image'), {
      is: true,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.nullable().default(null)
    }),
})

const MotherSchema: Schema<Mother> = CandidateSchema.required().shape({
  lastName: lastNameSchema,
  firstName: firstNameSchema,
  patronymicName: patronymicNameSchema,
  pin: pinSchema.default(null),
  passportNumber: passportNumberSchema.default(null),
  birthDate: birthDateSchema,
  deathDate: deathDateSchema,
  registeredAddress: registeredAddressSchema,
  actualAddress: actualAddressSchema,
})

const ForeignerSchema: Schema<Foreigner> = CandidateSchema.required().shape({
  lastName: lastNameSchema,
  firstName: firstNameSchema,
  patronymicName: patronymicNameSchema,
  gender: GenderSchema.required(),
  citizenshipId: number().required().min(1).label('Citizenship'),
  citizenshipRu: string().required().label('Citizenship'),
  citizenshipKg: string().required().label('Citizenship'),
  birthDate: birthDateSchema,
  deathDate: deathDateSchema,
})

const CreateForeignerSchema: Schema<CreateForeigner> = object({
  lastName: lastNameSchema,
  firstName: firstNameSchema,
  patronymicName: patronymicNameSchema,
  gender: GenderSchema.required(),
  citizenshipId: number().required().min(1).label('Citizenship'),
  birthDate: birthDateSchema,
  deathDate: deathDateSchema,
  image: imageSchema,
  imageName: imageNameSchema,
})

const UpdateForeignerDetailsSchema: Schema<UpdateForeignerDetails> = object({
  id: idSchema,
  lastName: lastNameSchema,
  firstName: firstNameSchema,
  patronymicName: patronymicNameSchema,
  gender: GenderSchema.required(),
  citizenshipId: number().required().min(1).label('Citizenship'),
  citizenshipRu: string().required().label('Citizenship'),
  citizenshipKg: string().required().label('Citizenship'),
  birthDate: birthDateSchema,
  deathDate: deathDateSchema,
})

const UpdateForeignerImageSchema: Schema<UpdateForeignerImage> = object({
  id: idSchema,
  image: string().nullable().default(null).label('Image'),
  imageName: string().defined().label('Filename')
    .when(nameof<UpdateForeignerImage>('image'), {
      is: true,
      then: schema => schema.required(),
      otherwise: schema => schema.nullable().default(null),
    })
})


const CreateEntitySchema: Schema<CreateEntity> = object({
  nameRu: string().required().max(64).label('Name (ru)'),
  nameKg: string().required().max(64).label('Name (kg)'),
  image: imageSchema,
  imageName: imageNameSchema,
})

const UpdateEntityDetailsSchema: Schema<UpdateEntityDetails> = object({
  id: number().required().label('Id'),
  nameRu: string().required().max(64).label('Name (ru)'),
  nameKg: string().required().max(64).label('Name (kg)'),
})

const UpdateEntityImageSchema: Schema<UpdateEntityImage> = object({
  id: idSchema,
  image: string().nullable().default(null).label('Image'),
  imageName: string().defined().label('Filename')
    .when(nameof<UpdateEntityImage>('image'), {
      is: true,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.nullable().default(null)
    })
})

const EntitySchema: Schema<Entity> = CandidateSchema.required().shape({
  nameRu: string().required().max(64).label('Name (ru)'),
  nameKg: string().required().max(64).label('Name (kg)'),
})

const OfficeSchema: Schema<Office> = AuditableEntitySchema.shape({
  id: idSchema,
  nameRu: string().required().label('Name (ru)'),
  nameKg: string().required().label('Name (kg)'),
})

const OfficeArraySchema = array().of(OfficeSchema.required()).default([])

const CreateOfficeSchema: Schema<CreateOffice> = object({
  id: idSchema.min(1),
  nameRu: string().required().max(256).label('Name (ru)'),
  nameKg: string().required().max(256).label('Name (kg)'),
})

const UpdateOfficeDetailsSchema: Schema<UpdateOfficeDetails> = object({
  id: idSchema,
  nameRu: string().required().max(256).label('Name (ru)'),
  nameKg: string().required().max(256).label('Name (kg)'),
})


const RewardSchema: Schema<Reward> = AuditableEntitySchema.shape({
  nameRu: nameRuSchema,
  nameKg: nameKgSchema,
  image: string().required().label('Image'),
  imageName: string().required().label('Filename'),
})

const UpdateRewardSchema: Schema<UpdateReward> = object({
  id: idSchema,
  nameRu: nameRuSchema,
  nameKg: nameKgSchema,
  image: string().required().label('Image'),
  imageName: string().required().label('Filename'),
})

const RewardArraySchema = array().of(RewardSchema.required()).default([])

const CreateRewardSchema: Schema<CreateReward> = object({
  nameRu: string().required().max(64).label('Name (ru)'),
  nameKg: string().required().max(64).label('Name (kg)'),
  image: string().required().label('Image'),
  imageName: string().required().label('Filename'),
})

const UserSchema: Schema<User> = AuditableEntitySchema
  .omit(['createdByUser', 'modifiedByUser'])
  .shape({
    userName: string().required().max(256).label('UserName'),
    lastName: lastNameSchema,
    firstName: firstNameSchema,
    patronymicName: patronymicNameSchema,
    email: string().nullable().default(null).label('Email'),
    pin: string().nullable().default(null).label('Pin'),
    image: imageSchema,
    roles: array().of(RoleSchema.required()).default([]).label('Roles'),
  })

const LoginValidationSchema = object({
  username: string().required().max(64).label('Username'),
  password: string().required().max(64).label('Password'),
})

export {
  EducationSchema,
  GenderSchema,
  RegionSchema,
  RoleSchema,

  CandidateWithoutImageSchema,
  CandidateSchema,
  CandidateWithoutImageArraySchema,

  CreateCitizenSchema,
  CitizenSchema,
  UpdateCitizenDetailsSchema,
  UpdateCitizenImageSchema,

  MotherSchema,
  CreateMotherSchema,
  UpdateMotherDetailsSchema,
  UpdateMotherImageSchema,

  ForeignerSchema,
  CreateForeignerSchema,
  UpdateForeignerDetailsSchema,
  UpdateForeignerImageSchema,

  EntitySchema,
  CreateEntitySchema,
  UpdateEntityDetailsSchema,
  UpdateEntityImageSchema,

  OfficeSchema,
  OfficeArraySchema,
  CreateOfficeSchema,
  UpdateOfficeDetailsSchema,

  RewardSchema,
  RewardArraySchema,
  CreateRewardSchema,
  UpdateRewardSchema,

  UserSchema,
  LoginValidationSchema,
}
