import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const ExampleScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt']);

export const ScheduledSessionScalarFieldEnumSchema = z.enum(['id','name','hostId','hostname','state','participantsCount','currentSessionId','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const SessionStatusSchema = z.enum(['WAITING','STARTED','ENDED']);

export type SessionStatusType = `${z.infer<typeof SessionStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// EXAMPLE SCHEMA
/////////////////////////////////////////

export const ExampleSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Example = z.infer<typeof ExampleSchema>

/////////////////////////////////////////
// SCHEDULED SESSION SCHEMA
/////////////////////////////////////////

export const ScheduledSessionSchema = z.object({
  state: SessionStatusSchema,
  id: z.string().cuid(),
  name: z.string(),
  hostId: z.string(),
  hostname: z.string(),
  participantsCount: z.number().int(),
  currentSessionId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ScheduledSession = z.infer<typeof ScheduledSessionSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// EXAMPLE
//------------------------------------------------------

export const ExampleSelectSchema: z.ZodType<Prisma.ExampleSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// SCHEDULED SESSION
//------------------------------------------------------

export const ScheduledSessionSelectSchema: z.ZodType<Prisma.ScheduledSessionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  hostId: z.boolean().optional(),
  hostname: z.boolean().optional(),
  state: z.boolean().optional(),
  participantsCount: z.boolean().optional(),
  currentSessionId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ExampleWhereInputSchema: z.ZodType<Prisma.ExampleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExampleWhereInputSchema),z.lazy(() => ExampleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExampleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExampleWhereInputSchema),z.lazy(() => ExampleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ExampleOrderByWithRelationInputSchema: z.ZodType<Prisma.ExampleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExampleWhereUniqueInputSchema: z.ZodType<Prisma.ExampleWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const ExampleOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExampleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ExampleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ExampleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ExampleMinOrderByAggregateInputSchema).optional()
}).strict();

export const ExampleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExampleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema),z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema),z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ScheduledSessionWhereInputSchema: z.ZodType<Prisma.ScheduledSessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ScheduledSessionWhereInputSchema),z.lazy(() => ScheduledSessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScheduledSessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScheduledSessionWhereInputSchema),z.lazy(() => ScheduledSessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hostId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hostname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => EnumSessionStatusFilterSchema),z.lazy(() => SessionStatusSchema) ]).optional(),
  participantsCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  currentSessionId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ScheduledSessionOrderByWithRelationInputSchema: z.ZodType<Prisma.ScheduledSessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  hostname: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  participantsCount: z.lazy(() => SortOrderSchema).optional(),
  currentSessionId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScheduledSessionWhereUniqueInputSchema: z.ZodType<Prisma.ScheduledSessionWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  currentSessionId: z.string().optional()
}).strict();

export const ScheduledSessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.ScheduledSessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  hostname: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  participantsCount: z.lazy(() => SortOrderSchema).optional(),
  currentSessionId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ScheduledSessionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ScheduledSessionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ScheduledSessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ScheduledSessionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ScheduledSessionSumOrderByAggregateInputSchema).optional()
}).strict();

export const ScheduledSessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ScheduledSessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ScheduledSessionScalarWhereWithAggregatesInputSchema),z.lazy(() => ScheduledSessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ScheduledSessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ScheduledSessionScalarWhereWithAggregatesInputSchema),z.lazy(() => ScheduledSessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hostId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hostname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => EnumSessionStatusWithAggregatesFilterSchema),z.lazy(() => SessionStatusSchema) ]).optional(),
  participantsCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  currentSessionId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ExampleCreateInputSchema: z.ZodType<Prisma.ExampleCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ExampleUncheckedCreateInputSchema: z.ZodType<Prisma.ExampleUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ExampleUpdateInputSchema: z.ZodType<Prisma.ExampleUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExampleUncheckedUpdateInputSchema: z.ZodType<Prisma.ExampleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExampleCreateManyInputSchema: z.ZodType<Prisma.ExampleCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ExampleUpdateManyMutationInputSchema: z.ZodType<Prisma.ExampleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExampleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ExampleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScheduledSessionCreateInputSchema: z.ZodType<Prisma.ScheduledSessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  hostId: z.string(),
  hostname: z.string(),
  state: z.lazy(() => SessionStatusSchema).optional(),
  participantsCount: z.number().int().optional(),
  currentSessionId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ScheduledSessionUncheckedCreateInputSchema: z.ZodType<Prisma.ScheduledSessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  hostId: z.string(),
  hostname: z.string(),
  state: z.lazy(() => SessionStatusSchema).optional(),
  participantsCount: z.number().int().optional(),
  currentSessionId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ScheduledSessionUpdateInputSchema: z.ZodType<Prisma.ScheduledSessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.lazy(() => SessionStatusSchema),z.lazy(() => EnumSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  participantsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentSessionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScheduledSessionUncheckedUpdateInputSchema: z.ZodType<Prisma.ScheduledSessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.lazy(() => SessionStatusSchema),z.lazy(() => EnumSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  participantsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentSessionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScheduledSessionCreateManyInputSchema: z.ZodType<Prisma.ScheduledSessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  hostId: z.string(),
  hostname: z.string(),
  state: z.lazy(() => SessionStatusSchema).optional(),
  participantsCount: z.number().int().optional(),
  currentSessionId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ScheduledSessionUpdateManyMutationInputSchema: z.ZodType<Prisma.ScheduledSessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.lazy(() => SessionStatusSchema),z.lazy(() => EnumSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  participantsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentSessionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ScheduledSessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ScheduledSessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hostname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.lazy(() => SessionStatusSchema),z.lazy(() => EnumSessionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  participantsCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currentSessionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const ExampleCountOrderByAggregateInputSchema: z.ZodType<Prisma.ExampleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExampleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExampleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExampleMinOrderByAggregateInputSchema: z.ZodType<Prisma.ExampleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumSessionStatusFilterSchema: z.ZodType<Prisma.EnumSessionStatusFilter> = z.object({
  equals: z.lazy(() => SessionStatusSchema).optional(),
  in: z.union([ z.lazy(() => SessionStatusSchema).array(),z.lazy(() => SessionStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => SessionStatusSchema).array(),z.lazy(() => SessionStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => SessionStatusSchema),z.lazy(() => NestedEnumSessionStatusFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ScheduledSessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.ScheduledSessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  hostname: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  participantsCount: z.lazy(() => SortOrderSchema).optional(),
  currentSessionId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScheduledSessionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ScheduledSessionAvgOrderByAggregateInput> = z.object({
  participantsCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScheduledSessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ScheduledSessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  hostname: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  participantsCount: z.lazy(() => SortOrderSchema).optional(),
  currentSessionId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScheduledSessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.ScheduledSessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  hostId: z.lazy(() => SortOrderSchema).optional(),
  hostname: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  participantsCount: z.lazy(() => SortOrderSchema).optional(),
  currentSessionId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ScheduledSessionSumOrderByAggregateInputSchema: z.ZodType<Prisma.ScheduledSessionSumOrderByAggregateInput> = z.object({
  participantsCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumSessionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSessionStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SessionStatusSchema).optional(),
  in: z.union([ z.lazy(() => SessionStatusSchema).array(),z.lazy(() => SessionStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => SessionStatusSchema).array(),z.lazy(() => SessionStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => SessionStatusSchema),z.lazy(() => NestedEnumSessionStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSessionStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSessionStatusFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const EnumSessionStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSessionStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SessionStatusSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumSessionStatusFilterSchema: z.ZodType<Prisma.NestedEnumSessionStatusFilter> = z.object({
  equals: z.lazy(() => SessionStatusSchema).optional(),
  in: z.union([ z.lazy(() => SessionStatusSchema).array(),z.lazy(() => SessionStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => SessionStatusSchema).array(),z.lazy(() => SessionStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => SessionStatusSchema),z.lazy(() => NestedEnumSessionStatusFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumSessionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSessionStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SessionStatusSchema).optional(),
  in: z.union([ z.lazy(() => SessionStatusSchema).array(),z.lazy(() => SessionStatusSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => SessionStatusSchema).array(),z.lazy(() => SessionStatusSchema) ]).optional(),
  not: z.union([ z.lazy(() => SessionStatusSchema),z.lazy(() => NestedEnumSessionStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSessionStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSessionStatusFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ExampleFindFirstArgsSchema: z.ZodType<Prisma.ExampleFindFirstArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ ExampleOrderByWithRelationInputSchema.array(),ExampleOrderByWithRelationInputSchema ]).optional(),
  cursor: ExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExampleScalarFieldEnumSchema.array().optional(),
}).strict()

export const ExampleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ExampleFindFirstOrThrowArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ ExampleOrderByWithRelationInputSchema.array(),ExampleOrderByWithRelationInputSchema ]).optional(),
  cursor: ExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExampleScalarFieldEnumSchema.array().optional(),
}).strict()

export const ExampleFindManyArgsSchema: z.ZodType<Prisma.ExampleFindManyArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ ExampleOrderByWithRelationInputSchema.array(),ExampleOrderByWithRelationInputSchema ]).optional(),
  cursor: ExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExampleScalarFieldEnumSchema.array().optional(),
}).strict()

export const ExampleAggregateArgsSchema: z.ZodType<Prisma.ExampleAggregateArgs> = z.object({
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ ExampleOrderByWithRelationInputSchema.array(),ExampleOrderByWithRelationInputSchema ]).optional(),
  cursor: ExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ExampleGroupByArgsSchema: z.ZodType<Prisma.ExampleGroupByArgs> = z.object({
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ ExampleOrderByWithAggregationInputSchema.array(),ExampleOrderByWithAggregationInputSchema ]).optional(),
  by: ExampleScalarFieldEnumSchema.array(),
  having: ExampleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ExampleFindUniqueArgsSchema: z.ZodType<Prisma.ExampleFindUniqueArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereUniqueInputSchema,
}).strict()

export const ExampleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ExampleFindUniqueOrThrowArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereUniqueInputSchema,
}).strict()

export const ScheduledSessionFindFirstArgsSchema: z.ZodType<Prisma.ScheduledSessionFindFirstArgs> = z.object({
  select: ScheduledSessionSelectSchema.optional(),
  where: ScheduledSessionWhereInputSchema.optional(),
  orderBy: z.union([ ScheduledSessionOrderByWithRelationInputSchema.array(),ScheduledSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: ScheduledSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ScheduledSessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const ScheduledSessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ScheduledSessionFindFirstOrThrowArgs> = z.object({
  select: ScheduledSessionSelectSchema.optional(),
  where: ScheduledSessionWhereInputSchema.optional(),
  orderBy: z.union([ ScheduledSessionOrderByWithRelationInputSchema.array(),ScheduledSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: ScheduledSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ScheduledSessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const ScheduledSessionFindManyArgsSchema: z.ZodType<Prisma.ScheduledSessionFindManyArgs> = z.object({
  select: ScheduledSessionSelectSchema.optional(),
  where: ScheduledSessionWhereInputSchema.optional(),
  orderBy: z.union([ ScheduledSessionOrderByWithRelationInputSchema.array(),ScheduledSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: ScheduledSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ScheduledSessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const ScheduledSessionAggregateArgsSchema: z.ZodType<Prisma.ScheduledSessionAggregateArgs> = z.object({
  where: ScheduledSessionWhereInputSchema.optional(),
  orderBy: z.union([ ScheduledSessionOrderByWithRelationInputSchema.array(),ScheduledSessionOrderByWithRelationInputSchema ]).optional(),
  cursor: ScheduledSessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ScheduledSessionGroupByArgsSchema: z.ZodType<Prisma.ScheduledSessionGroupByArgs> = z.object({
  where: ScheduledSessionWhereInputSchema.optional(),
  orderBy: z.union([ ScheduledSessionOrderByWithAggregationInputSchema.array(),ScheduledSessionOrderByWithAggregationInputSchema ]).optional(),
  by: ScheduledSessionScalarFieldEnumSchema.array(),
  having: ScheduledSessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ScheduledSessionFindUniqueArgsSchema: z.ZodType<Prisma.ScheduledSessionFindUniqueArgs> = z.object({
  select: ScheduledSessionSelectSchema.optional(),
  where: ScheduledSessionWhereUniqueInputSchema,
}).strict()

export const ScheduledSessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ScheduledSessionFindUniqueOrThrowArgs> = z.object({
  select: ScheduledSessionSelectSchema.optional(),
  where: ScheduledSessionWhereUniqueInputSchema,
}).strict()

export const ExampleCreateArgsSchema: z.ZodType<Prisma.ExampleCreateArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  data: z.union([ ExampleCreateInputSchema,ExampleUncheckedCreateInputSchema ]),
}).strict()

export const ExampleUpsertArgsSchema: z.ZodType<Prisma.ExampleUpsertArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereUniqueInputSchema,
  create: z.union([ ExampleCreateInputSchema,ExampleUncheckedCreateInputSchema ]),
  update: z.union([ ExampleUpdateInputSchema,ExampleUncheckedUpdateInputSchema ]),
}).strict()

export const ExampleCreateManyArgsSchema: z.ZodType<Prisma.ExampleCreateManyArgs> = z.object({
  data: z.union([ ExampleCreateManyInputSchema,ExampleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ExampleDeleteArgsSchema: z.ZodType<Prisma.ExampleDeleteArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereUniqueInputSchema,
}).strict()

export const ExampleUpdateArgsSchema: z.ZodType<Prisma.ExampleUpdateArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  data: z.union([ ExampleUpdateInputSchema,ExampleUncheckedUpdateInputSchema ]),
  where: ExampleWhereUniqueInputSchema,
}).strict()

export const ExampleUpdateManyArgsSchema: z.ZodType<Prisma.ExampleUpdateManyArgs> = z.object({
  data: z.union([ ExampleUpdateManyMutationInputSchema,ExampleUncheckedUpdateManyInputSchema ]),
  where: ExampleWhereInputSchema.optional(),
}).strict()

export const ExampleDeleteManyArgsSchema: z.ZodType<Prisma.ExampleDeleteManyArgs> = z.object({
  where: ExampleWhereInputSchema.optional(),
}).strict()

export const ScheduledSessionCreateArgsSchema: z.ZodType<Prisma.ScheduledSessionCreateArgs> = z.object({
  select: ScheduledSessionSelectSchema.optional(),
  data: z.union([ ScheduledSessionCreateInputSchema,ScheduledSessionUncheckedCreateInputSchema ]),
}).strict()

export const ScheduledSessionUpsertArgsSchema: z.ZodType<Prisma.ScheduledSessionUpsertArgs> = z.object({
  select: ScheduledSessionSelectSchema.optional(),
  where: ScheduledSessionWhereUniqueInputSchema,
  create: z.union([ ScheduledSessionCreateInputSchema,ScheduledSessionUncheckedCreateInputSchema ]),
  update: z.union([ ScheduledSessionUpdateInputSchema,ScheduledSessionUncheckedUpdateInputSchema ]),
}).strict()

export const ScheduledSessionCreateManyArgsSchema: z.ZodType<Prisma.ScheduledSessionCreateManyArgs> = z.object({
  data: z.union([ ScheduledSessionCreateManyInputSchema,ScheduledSessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ScheduledSessionDeleteArgsSchema: z.ZodType<Prisma.ScheduledSessionDeleteArgs> = z.object({
  select: ScheduledSessionSelectSchema.optional(),
  where: ScheduledSessionWhereUniqueInputSchema,
}).strict()

export const ScheduledSessionUpdateArgsSchema: z.ZodType<Prisma.ScheduledSessionUpdateArgs> = z.object({
  select: ScheduledSessionSelectSchema.optional(),
  data: z.union([ ScheduledSessionUpdateInputSchema,ScheduledSessionUncheckedUpdateInputSchema ]),
  where: ScheduledSessionWhereUniqueInputSchema,
}).strict()

export const ScheduledSessionUpdateManyArgsSchema: z.ZodType<Prisma.ScheduledSessionUpdateManyArgs> = z.object({
  data: z.union([ ScheduledSessionUpdateManyMutationInputSchema,ScheduledSessionUncheckedUpdateManyInputSchema ]),
  where: ScheduledSessionWhereInputSchema.optional(),
}).strict()

export const ScheduledSessionDeleteManyArgsSchema: z.ZodType<Prisma.ScheduledSessionDeleteManyArgs> = z.object({
  where: ScheduledSessionWhereInputSchema.optional(),
}).strict()