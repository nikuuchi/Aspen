///<reference path='../../typings/jstree/jstree.d.ts'/>

class FileManager {
  FTree:any = [
    {"text":"root", "children":[{"text":"program.c","type":"file"}]}
  ];
  constractor() {
  }

  ref() : any {
    return $('#sidebar').jstree(true);
  }

  setFolder(sel: string, fname: string) {
    if(!this.ref().create_node(sel, {text:fname})){
      alert("Error");
      return false;
    }
    this.ref().open_node(sel);
    return true;
  }

  setFile(selectedPos: string, fname: string) {
    if(!this.ref().create_node(selectedPos, {text:fname, type:'file'})){
      alert("Error");
      return false;
    }
    this.ref().open_node(selectedPos);
    return true;
  }

  getFile(path: string) {
    if(localStorage[path]) return localStorage[path];
    return false;
  }

  getSelectedNode() : string {
    var selectedNodes = this.ref().get_selected();
    return selectedNodes[0];
  }

  getCurrentType() : string {
    return this.ref().get_type(this.getSelectedNode());
  }

  getCurrentPath() : string {
    return this.ref().get_path(this.getSelectedNode(),"/");
  }

  show() {
    console.log(this.FTree);
  }

}
