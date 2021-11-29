import { BinTreeNode } from "./BinTreeNode";

//#region TreeSource

export interface TreeSourceProps {
    treeState?: any;
    smallValueState?: any;
    treeOutput?: any;
}

export interface TreeSourceState {
    file?: any;
    fileTextValue?: any;
    status?: any;
}
//#endregion

//#region TreeJson

export interface TreeJsonProps {
    treeText?: string;
    binTreeNode?: BinTreeNode;
    treeState?: any;
    treeOutput?: any;
    smallValueState?: any;
}

export interface TreeJsonState {
    treeJsonEdit?: string;
    status?: boolean;
    active?: boolean;
}
//#endregion

//#region TreeOutput

export interface TreeOutputProps {
    treeText?: string;
    binTreeNode?: BinTreeNode;
    smallValue?: BinTreeNode;
}

//#endregion