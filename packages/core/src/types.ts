import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';
import { DocumentNode } from 'graphql';

export type ResolveFn = (
  _: any,
  args: Record<string, any>,
  context: { cache: DataProxy } & Record<string, any>,
) => any;

// Query related

export interface QueryMap {
  [key: string]: QueryDef;
}

export interface QuerySchema {
  [key: string]: QueryResolveFn;
}

export type QueryDef = {
  name: string;
  resolve: QueryResolveFn;
};

export type QueryResolveFn = ResolveFn;

// Mutation related

export interface MutationMap {
  [key: string]: MutationDef;
}

export interface MutationSchema {
  [key: string]: MutationResolveFn;
}

export interface MutationDef {
  mutation: DocumentNode;
  resolve: MutationResolveFn;
}

export type MutationResolveFn = ResolveFn;

// Update related

export interface Update extends UpdateContext {
  cache: DataProxy;
}

export interface UpdateContext {
  name: string;
  variables?: Record<string, any>;
  result: FetchResult;
}

export type UpdateResolveFn = (update: Update) => any;

export type UpdateDef = UpdateDefFull | UpdateDefShort;

export interface UpdateDefCommon {
  match: MatchFn;
}

export interface UpdateDefFull extends UpdateDefCommon {
  resolve: UpdateResolveFn;
}

export interface UpdateDefShort extends UpdateDefCommon {
  query: DocumentNode;
  update: (data: any, result: any) => any;
}

export type MatchFn = (update: UpdateContext) => boolean;
