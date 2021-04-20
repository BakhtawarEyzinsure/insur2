import { AbilityBuilder } from "@casl/ability";

export default AbilityBuilder.define(can => {
    can(["read", "create"], "Todo");
    can(["update"], "Todo", { assignee: "me" });
});
