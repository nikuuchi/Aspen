class FileManager {
  FTree:any = [
    {"text":"root", "children":[{"text":"program.c","type":"file"}]}
  ];
  constractor() {
  }

  setFolder(ref:any, sel: string, fname: string) {
    if(!ref.create_node(sel, {text:fname})){
      alert("Error");
      return false;
    }
    ref.open_node(sel);
    return true;
  }

  setFile(ref:any, sel: string, fname: string) {
    if(!ref.create_node(sel, {text:fname, type:'file'})){
      alert("Error");
      return false;
    }
    ref.open_node(sel);
    return true;
  }

  getFile(path: string) {
    if(localStorage[path]) return localStorage[path];
    return false;
  }

  show() {
    console.log(this.FTree);
  }

}
