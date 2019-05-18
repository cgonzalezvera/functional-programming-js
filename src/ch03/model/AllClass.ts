class MyNode {
    private _parent: any = null;
    private _children: Array<MyNode> = [];
    constructor(private _val: any) { }

    public get children(): Array<MyNode> {
        return this._children;
    }
    public hasChildren(): boolean {
        return this._children.length > 0;
    }
    public get value() {
        return this._val;
    }
    public set value(val) {
        this._val = val;
    }
    public append(child: MyNode) {
        child._parent = this;
        this._children.push(child);
        return this;
    }
    public toString() {
        return `Node (val: ${this._val}, children:
${this._children.length})`;
    }
}

class Tree {
    constructor(private _root) {
    }
    static map(node: MyNode, fn: (MyNode) => MyNode, tree: Tree = null): Tree {
        node.value = fn(node.value);
        if (tree === null) {
            tree = new Tree(node);
        }
        if (node.hasChildren()) {
            node.children.map(function (child) {
                Tree.map(child, fn, tree);
            });
        }
        return tree;
    }
    get root() {
        return this._root;
    }

    public toArray(node: MyNode = null, arr = []) {
        if (node === null) {
            node = this._root;
        }
        arr.push(node.value);
        // Base case
        if (node.hasChildren()) {
            var that = this; // TODO revisit Lodash doc to insert objec context
            node.children.map(function (child) {
                that.toArray(child, arr);
            });
        }
        return arr;
    }
}

const B = new MyNode("B");
const C = new MyNode("C");

const church = new MyNode("A");
church.append(B).append(C);

console.log(church.value);
const result = Tree.map(church, (p) => p);
console.log("tree ", result);
console.log("result ", result.toArray());


