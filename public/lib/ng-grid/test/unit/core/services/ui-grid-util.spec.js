describe('ui.grid.utilService', function() {
  var gridUtil,
      $window,
      Grid;

  beforeEach(module('ui.grid'));

  beforeEach(inject(function(_gridUtil_, _$window_, _Grid_) {
    gridUtil = _gridUtil_;
    $window = _$window_;
    Grid = _Grid_;
  }));

  describe('newId()', function() {
    it('creates a unique id each time it is called', function() {
      var id1 = gridUtil.newId();
      var id2 = gridUtil.newId();

      expect(id1).not.toEqual(id2);
    });
  });

  describe('readableColumnName', function() {
    it('does not throw with null name', function() {
      expect(function() {
        gridUtil.readableColumnName(null);
      }).not.toThrow();
    });

    it('should create readable column names from properties', function() {
      var translationExpects = [
        [0, '0'],
        ['property', 'Property'],
        ['Property', 'Property'],
        ['aProperty', 'A Property'],
        ['ThisProperty', 'This Property'],
        ['thisSecondProperty', 'This Second Property'],
        ['thingsILove', 'Things I Love'],
        ['a_property', 'A Property'],
        ['a__property', 'A Property'],
        ['another_property', 'Another Property'],
        ['ALLCAPS', 'Allcaps'],
        ['address.city', 'Address.City']
      ];

      angular.forEach(translationExpects, function (set) {
        var strIn = set[0];
        var strOut = set[1];
        
        expect(gridUtil.readableColumnName(strIn)).toEqual(strOut);
      });
    });

    it('handles multiple capitlization->separations', function() {
      var multiCapsed = gridUtil.readableColumnName('thisIsSoCool');

      expect(multiCapsed).toEqual('This Is So Cool');
    });
  });

  describe('getColumnsFromData', function() {
    it('should create column defs from a data array', function() {
      var data = [
        {
          firstName: 'Bob',
          lastName: 'Smith'
        }
      ];

      var columns = gridUtil.getColumnsFromData(data);

      expect(columns)
      .toEqual([
        {
          name: 'firstName'
        },
        {
          name: 'lastName'
        }
      ]);
    });
  });
  
  describe('getColumnsFromData', function() {
    it('should create column defs from a data array omitting $$hashKey', function() {
      var data = [
        {
          firstName: 'Bob',
          lastName: 'Smith',
          $$hashKey: '00A'
        }
      ];
      
      var excludeProperties = ['$$hashKey'];

      var columns = gridUtil.getColumnsFromData(data, excludeProperties);

      expect(columns)
      .toEqual([
        {
          name: 'firstName'
        },
        {
          name: 'lastName'
        }
      ]);
    });
  });

  describe('element calculations', function() {
    var elm;

    beforeEach(function() {
      elm = document.createElement('div');
      elm.style.height = "300px";
      elm.style.width = "200px";
      document.body.appendChild(elm);
    });

    afterEach(function() {
      angular.element(elm).remove();
      elm = null;
    });

    describe('elementWidth()', function () {
      it('should calculate element width', function() {
        //var elm = angular.element('<div style="width: 200px">asdf</div>');
        // dump(elm.ownerDocument.defaultView.getComputedStyle(elm, null)['width']);

        var w = gridUtil.elementWidth(elm);

        expect(w).toEqual(200);
      });
    });

    describe('elementHeight()', function () {
      it('should calculate element height', function() {
        var w = gridUtil.elementHeight(elm);

        expect(w).toEqual(300);
      });

      it('should work with hidden element', function() {
        angular.element(elm).remove();

        elm = document.createElement('div');
        elm.style.height = "300px";
        elm.style.width = "200px";
        elm.style.display = "none";
        document.body.appendChild(elm);

        angular.element(elm).append('<div id="testelm" style="display: none">Test Test Test</div>');

        var testelm = document.getElementById('testelm');
        var h = gridUtil.elementHeight(testelm);

        expect(h).toBeGreaterThan(0);
      });
    });

    describe('elementWidth()', function () {
      it('should calculate element width', function() {
        //var elm = angular.element('<div style="width: 200px">asdf</div>');
        // dump(elm.ownerDocument.defaultView.getComputedStyle(elm, null)['width']);

        var w = gridUtil.elementWidth(elm);

        expect(w).toEqual(200);
      });
    });

    describe('outerElementHeight()', function () {
      it('should calculate element height, including border', function() {
        elm.style.border = "1px solid black";
        var w = gridUtil.outerElementHeight(elm);

        expect(w).toEqual(302);
      });
    });

    describe('outerElementWidth()', function () {
      it('should calculate element Width, including border', function() {
        elm.style.border = "1px solid black";
        var w = gridUtil.outerElementWidth(elm);

        expect(w).toEqual(202);
      });
    });

    describe('getTemplate', function () {
      it('should work with url and cache on 2nd call', inject(function ($httpBackend, $timeout) {
        var html = '<div/>';
        var url = '/someUrl.html';
        $httpBackend.expectGET(url)
          .respond(html);

        var result;
        gridUtil.getTemplate(url).then(function (r) {
          result = r;
        });
        $httpBackend.flush();

        $httpBackend.verifyNoOutstandingRequest();
        expect(result).toEqual(html);

        //call again should not do any http
        result = null;
        $timeout(function () {
          gridUtil.getTemplate(url).then(function (r) {
            result = r;
          });
        });
        $timeout.flush();

        $httpBackend.verifyNoOutstandingRequest();
        expect(result).toEqual(html);

      }));

      it('should work with many different urls', inject(function ($httpBackend, $timeout) {
        var html = '<div/>';
        var url = 'http://someUrl.html';
        $httpBackend.expectGET(url)
          .respond(html);

        var result;
        gridUtil.getTemplate(url).then(function (r) {
          result = r;
        });
        $httpBackend.flush();

        $httpBackend.verifyNoOutstandingRequest();
        expect(result).toEqual(html);

        //call again should not do any http
        result = null;
        $timeout(function () {
          gridUtil.getTemplate(url).then(function (r) {
            result = r;
          });
        });
        $timeout.flush();

        $httpBackend.verifyNoOutstandingRequest();
        expect(result).toEqual(html);

      }));


      it('should work with html', inject(function ($timeout) {
        var html = '<div></div>';
        var result = null;
        $timeout(function () {
          gridUtil.getTemplate(html).then(function (r) {
            result = r;
          });
        });
        $timeout.flush();
        expect(result).toEqual(html);
      }));

      it('should work with promise', inject(function ($timeout, $q) {
        var html = '<div></div>';
        var promise = $q.when(html);
        var result = null;
        $timeout(function () {
          gridUtil.getTemplate(promise).then(function (r) {
            result = r;
          });
        });
        $timeout.flush();
        expect(result).toEqual(html);
      }));

    });

  });

  describe('type()', function () {
    it('should return the type of an object as a string', function () {
      var g = new Grid({ id: 1 });

      expect(gridUtil.type(g)).toEqual('Grid');
    });
  });
});