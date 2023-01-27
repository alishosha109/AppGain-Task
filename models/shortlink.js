

class ShorLinkSchema{
  constructor(slug, ios,android,web) {
    this.slug = slug;
    this.ios = ios;
    this.android = android;
    this.web = web;
  }

  get_collection() {
    let obj = {slug:this.slug,ios:this.ios,android:this.android,web:this.web}
    return obj;
  }
}



module.exports = ShorLinkSchema;

