function BSTree() {
    this.head;
    this.count = 1;
    this.edges = [];
    this.nodes = [];
    this.createTree = function (initKey) {
        this.head = new Node(initKey);
    }

    /**
     * insert a node with specified key
     * @params key
     */
    this.insert = function (key) {
        var ptr = this.head;
        while (ptr) {
            if (ptr.key > key) {
                if (ptr.left) 
                    ptr = ptr.left;
                else {
                    ptr.left = new Node(key);
                    break;
                }
            } else {
                if (ptr.right) 
                    ptr = ptr.right;
                else {
                    ptr.right = new Node(key);
                    break;
                }
            }
        }
    }

    /**
     * delete a node with specified key
     * @params key
     */
    this.remove = function (key) {
        var ptr = this.head;
        var last_ptr;
        if (!ptr) 
            return;
        while (ptr.key !== key && ptr.key) {
            if (!ptr.left && !ptr.right) 
                break;
            last_ptr = ptr;
            if (ptr.key > key) 
                ptr = ptr.left;
            else 
                ptr = ptr.right;
            }
        if (ptr.key === key) {
            var _left = ptr.left
                ? true
                : false;
            var _right = ptr.right
                ? true
                : false;
            if (!ptr.left && !ptr.right) {
                if (!last_ptr) {
                    this.head = null;
                    return;
                }
                if (last_ptr.key > key) 
                    last_ptr.left = null;
                else 
                    last_ptr.right = null;
                }
            else if (_left ^ _right) {
                if (!last_ptr) {
                    this.head = _left
                        ? ptr.left
                        : ptr.right;
                    return;
                }
                if (last_ptr.key > key) {
                    if (_left) 
                        last_ptr.left = ptr.left;
                    else 
                        last_ptr.left = ptr.right;
                    }
                else {
                    if (_left) 
                        last_ptr.right = ptr.left;
                    else 
                        last_ptr.right = ptr.right;
                    }
                } else {
                var temp = ptr.right;
                var left_ptr = ptr.left;
                var right_ptr = ptr.right;
                var all_ptrs;
                while (temp.left) {
                    temp = temp.left;
                }
                ptr = new Node(temp.key);
                if (last_ptr) 
                    if (last_ptr.key > key) 
                        last_ptr.left = ptr;
                    else 
                        last_ptr.right = ptr;
            else 
                    this.head = ptr;
                ptr.left = left_ptr;
                all_ptrs = this.traverse(headPtr = right_ptr, verbose = false);
                console.log('allptrs=', all_ptrs);
                all_ptrs.map((x) => {
                    if (x != ptr.key) 
                        this.insert(x);
                    }
                );
            }
        }
    }

    /**
     * remove the lowest key-value node
     */
    this.removeLowestValue = function () {
        var ptr = this.head;
        var last_ptr;
        if (!ptr) 
            return;
        while (ptr.left) {
            last_ptr = ptr;
            ptr = ptr.left;
        }
        if (last_ptr && ptr.right) 
            last_ptr.left = ptr.right;
        else if (last_ptr) 
            last_ptr.left = null;
        else {
            this.head = this.head.right;
        }
    }

    this.findSmallest = function (ptr) {
        if (!ptr) 
            return;
        this.findSmallest(ptr.left);
        this.findSmallest(ptr.right);
    }

    /**
     * print out all the nodes in the tree in increasing order
     * @params ptr, head of the node
     */
    this.printIncreasingOrder = function (ptr) {
        if (!ptr) 
            return;
        this.printIncreasingOrder(ptr.left);
        console.log(ptr.key);
        this.printIncreasingOrder(ptr.right);
    }

    /**
     * level-order traversal
     */
    this.traverse = function (headPtr = this.head, verbose = true) {
        var ptrs = [];
        var all_ptrs = [];
        var _edges = [];
        var _nodes = [];
        ptrs.push(headPtr);
        var ptr;
        this.count = 1;
        while (ptrs) {
            ptr = ptrs.shift();
            if (!ptr) {
                this.edges = _edges;
                all_ptrs.map((i) => {
                    _nodes.push({id: i, label: i})
                });
                this.nodes = _nodes;
                return all_ptrs;
            }
            if (verbose) 
                console.log(this.count++ + '. -> ', ptr.key);
            else {
                all_ptrs.push(ptr.key);
                if (ptr.left) 
                    _edges.push({from: ptr.key, to: ptr.left.key});
                if (ptr.right) 
                    _edges.push({from: ptr.key, to: ptr.right.key});
                }
            if (ptr.left) 
                ptrs.push(ptr.left);
            if (ptr.right) 
                ptrs.push(ptr.right);
            }
        }
}

function Node(k) {
    this.key = k;
    this.left;
    this.right;
}