var tinybind = require('tinybind')
require('../tinybind-backbone')
var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')

var expect = chai.expect
chai.use(sinonChai)

describe('Binding to a model', function () {

  describe('property', function(){
    beforeEach(function() {
      document.body.innerHTML = '<div rv-text="model:name"></div>' 
      this.model = new Backbone.Model({name: 'test', value: 'foo'})
      this.view = tinybind.bind(document.body, {model: this.model})
      this.binding = this.view.bindings[0]
    })
    
    it('should observe the model', function() {
      expect(this.binding.observer.target).to.be.equal(this.model)
    })

    it('should initialize the binding value with the property value', function() {
      expect(this.binding.observer.value()).to.be.equal('test')
    })    

    it('should listen to changes in the property', function() {
      var spy = sinon.stub(this.binding, 'set')
      this.model.set('name', 'bar')
      expect(spy).to.be.calledOnce
      expect(spy).to.be.calledWithExactly('bar')
    })

    it('should not listen to changes in other properties', function() {
      var spy = sinon.spy(this.binding, 'set')
      this.model.set('value', 'bar')
      expect(spy).to.not.be.called
    })
  })

  describe('with an asterisk', function(){
    
    beforeEach(function() {
      document.body.innerHTML = '<div rv-text="model:*"></div>' 
      this.model = new Backbone.Model({name: 'test', value: 'foo'})
      this.view = tinybind.bind(document.body, {model: this.model})
      this.binding = this.view.bindings[0]
    })

    it('should observe the model', function() {
      expect(this.binding.observer.target).to.be.equal(this.model)
    })

    it('should initialize the binding value with the attributes value', function() {
      expect(this.binding.observer.value()).to.be.equal(this.model.attributes)
    })    

    it('should listen to changes in any property', function() {
      var spy = sinon.stub(this.binding, 'set')
      this.model.set('name', 'bar')
      expect(spy).to.be.calledOnce
      spy.reset()
      this.model.set('value', 'bar')
      expect(spy).to.be.calledOnce
      spy.reset()
      this.model.set('other', 'prop')
      expect(spy).to.be.calledOnce    
    })
  })  
})

describe('Binding to a collection', function () {

  describe('with an empty path', function(){
    beforeEach(function() {
      document.body.innerHTML = '<div rv-text="collection:"></div>' 
      this.collection = new Backbone.Collection([{name: 'foo'}, {name: 'bar'}])
      this.view = tinybind.bind(document.body, {collection: this.collection})
      this.binding = this.view.bindings[0]
    })
    
    it('should observe the collection', function() {
      expect(this.binding.observer.target).to.be.equal(this.collection)
    })

    it('should initialize the binding value with the collection', function() {
      expect(this.binding.observer.value()).to.be.equal(this.collection)
    })    

    it('should listen to changes in collection', function() {
      var spy = sinon.stub(this.binding, 'set')
      this.collection.add({name: 'x'})
      this.collection.pop()
      expect(spy).to.be.calledTwice
    })
  })

  describe.skip('with an asterisk', function(){
    
    beforeEach(function() {
      document.body.innerHTML = '<div rv-text="collection:*"></div>' 
      this.collection = new Backbone.Collection([{name: 'foo'}, {name: 'bar'}])
      this.view = tinybind.bind(document.body, {collection: this.collection})
      this.binding = this.view.bindings[0]
    })

    it('should observe the collection', function() {
      expect(this.binding.observer.target).to.be.equal(this.collection)
    })

    it('should initialize the binding value with the models value', function() {
      expect(this.binding.observer.value()).to.be.equal(this.collection.models)
    })
  })  
})