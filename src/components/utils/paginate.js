import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;

    // We slice() items from (startIndex) and then take (pageSize) and then convert to array using (value())
    return _(items).slice(startIndex).take(pageSize).value();
}
