interface IBreadcrumb {
  label: string;
  href?: string;
}

export class Breadcrumb {
  label: string;
  href?: string;

  constructor(obj: IBreadcrumb = { label: '', href: ''}) {
    this.label = obj.label;
    this.href = obj.href;
  }
}
