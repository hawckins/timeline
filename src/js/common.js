require([
    "knockout",
    "ojs/ojbootstrap",
    "ojs/ojarraydataprovider",
    "ojs/ojknockout-keyset",
    "ojs/ojresponsiveutils",
    "ojs/ojresponsiveknockoututils",
    "!text!../data/timeline-data.json",
    "ojs/ojknockout",
    "ojs/ojselector",
    "ojs/ojlistitemlayout",
    "ojs/ojavatar",
    "ojs/ojlistview",
    "ojs/ojbutton"
  ], function(
    ko,
    Bootstrap,
    ArrayDataProvider,
    keySet,
    ResponsiveUtils,
    ResponsiveKnockoutUtils,
    jsonData
  ) {
    function ViewModel() {
      this.dataList = null;
      var smQuery = ResponsiveUtils.getFrameworkQuery(
        ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY
      );
      
      this.dataList = JSON.parse(jsonData);
      this.dataProvider1 = new ArrayDataProvider(this.dataList, { 
        keys: this.dataList.map((value) => {
          return value.id;
        })
      });
  
      this.selectorSelectedItems1 = new keySet.ObservableKeySet();
      this.content = ko.observable("");
      this.disabled = ko.observable(true);
      this.previousElementKey = null;
      this.gotoList = () => {
          this.slide();
          this.disabled(true);
          const listView = document.getElementById("listviewtwo");
          listView.currentItem = this.previousElementKey;
          listView.focus();
      };
      this.gotoContent = (event) => {
        if (event.detail.value != null &&
            event.detail.value.values().size > 0) {
            let key = event.detail.value
                .values()
                .values()
                .next().value;
            console.log(event.detail.value.values().values().next().value);
            console.log(this.previousElementKey);
            this.previousElementKey;
            let row = this.dataList[key];
            console.log(row);
            this.content(row.position);
            this.slide();
            this.disabled(false);
        }
      };
      this.slide = () => {
          document.getElementById("listitemlayout").classList.toggle("demo-page1-hide");
          document.getElementById("listitemcontent").classList.toggle("demo-page2-hide");
      };
  
      this.getIconContainerClass = function(type) {
        let styleClasses = "oj-icon-circle oj-icon-circle-xs";
        switch (type) {
          case "pdf":
            styleClasses = styleClasses + " oj-icon-circle-red";
            break;
          case "doc":
            styleClasses = styleClasses + " oj-icon-circle-teal";
            break;
        }
        return styleClasses;
      };
  
      this.getIconClass = function(type) {
        switch (type) {
          case "pdf":
            return "oj-ux-ico-file-pdf";
          case "doc":
            return "oj-ux-ico-file-doc";
          default:
            return "oj-ux-ico-folder";
        }
      };
    }
    Bootstrap.whenDocumentReady().then(function() {
      ko.applyBindings(
        new ViewModel(),
        document.getElementById("listviewContainer")
      );
    });
  });
