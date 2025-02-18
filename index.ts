import type { Address, Agent, Language, LanguageContext, HolochainLanguageDelegate, Interaction } from "@perspect3vism/ad4m";
import ProfileAdapter from "./adapter";
import ProfileAuthorAdapter from "./authorAdapter";
import Icon from "./build/Icon.js";
import ConstructorIcon from "./build/ConstructorIcon.js";
import { ProfileExpressionUI } from "./profileExpressionUI";
import { DNA, DNA_NICK } from "./dna";

function iconFor(expression: Address): string {
  return Icon;
}

function constructorIcon(): string {
  return ConstructorIcon;
}

function interactions(expression: Address): Interaction[] {
  return [];
}

function isImmutableExpression(expression: Address): boolean {
  return false
}

export const name = "profile-expression";

export default async function create(context: LanguageContext): Promise<Language> {
  const Holochain = context.Holochain as HolochainLanguageDelegate;
  await Holochain.registerDNAs([{ file: DNA, nick: DNA_NICK }]);

  const expressionAdapter = new ProfileAdapter(context);
  const authorAdaptor = new ProfileAuthorAdapter(context);
  const expressionUI = new ProfileExpressionUI();

  return {
    name,
    expressionAdapter,
    authorAdaptor,
    iconFor,
    constructorIcon,
    interactions,
    expressionUI,
    isImmutableExpression
  } as Language;
}
