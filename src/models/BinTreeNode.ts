export class BinTreeNode {
    id: string | number | null;
    left: BinTreeNode | null;
    right: BinTreeNode | null
    
    /**
     * Constructor
     * @param id id tree
     * @param left child lef tree
     * @param right child right tree
     */
    constructor(id: string | number | null, left: BinTreeNode | null, right: BinTreeNode | null) {
        this.id = id;
        this.left = left;
        this.right = right
    }
}
