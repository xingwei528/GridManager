'use strict';
import Adjust from '../src/js/Adjust';
import { jTool } from '../src/js/Base';
/**
 * 验证类的属性及方法总量
 */
describe('Adjust 验证类的属性及方法总量', function() {
	var getPropertyCount = null;
	beforeEach(function() {
		getPropertyCount = function(o){
			var n, count = 0;
			for(n in o){
				if(o.hasOwnProperty(n)){
					count++;
				}
			}
			return count;
		}
	});
	afterEach(function(){
		getPropertyCount = null;
	});
	it('Function count', function() {
		// es6 中 constructor 也会算做为对象的属性, 所以总量上会增加1
		expect(getPropertyCount(Object.getOwnPropertyNames(Object.getPrototypeOf(Adjust)))).toBe(6 + 1);
	});
});

describe('Adjust.html', function() {
	it('基础验证', function(){
		expect(Adjust.html).toBeDefined();
		expect(Adjust.html).toBe('<span class="adjust-action"></span>');
	});
});

describe('Adjust.bindAdjustEvent($table)', function() {
	it('基础验证', function(){
		expect(Adjust.bindAdjustEvent).toBeDefined();
		expect(Adjust.bindAdjustEvent.length).toBe(1);
	});
});

describe('Adjust.runMoveEvent($table, $th, $nextTh)', function() {
	it('基础验证', function(){
		expect(Adjust.runMoveEvent).toBeDefined();
		expect(Adjust.runMoveEvent.length).toBe(3);
	});
});

describe('Adjust.runStopEvent($table, $th, $td)', function() {
	it('基础验证', function(){
		expect(Adjust.runStopEvent).toBeDefined();
		expect(Adjust.runStopEvent.length).toBe(3);
	});
});

describe('Adjust.resetAdjust($table)', function() {
	let $table = null;
	beforeEach(function() {
		document.body.innerHTML = '<table></table>';
		$table = jTool('table');
	});

	afterEach(function(){
		document.body.innerHTML = '';
		$table = null;
	});
	it('基础验证', function() {
		expect(Adjust.resetAdjust).toBeDefined();
		expect(Adjust.resetAdjust.length).toBe(1);
	});

	it('验证返回值', function() {
		expect(Adjust.resetAdjust()).toBe(false);
		expect(Adjust.resetAdjust($table)).toBe(false);
	});
});

describe('Adjust.destroy($table)', function() {
	let table = null;
	let $table = null;
	let $adjustAction = null;
	beforeEach(function() {
		document.body.innerHTML = '<table><thead><th>test<span class="adjust-action"></span></th></thead></table>';
		table = document.querySelector('table');
		$table = jTool('table');
		$adjustAction = jTool('.adjust-action', $table);
		$table.bind('mouseup mouseleave', () => {});
		$table.bind('mousemove',  () => {});
		$table.on('mousedown', '.adjust-action', () => {});
	});

	afterEach(function(){
		document.body.innerHTML = '';
		$table.unbind('mouseup mouseleave');
		$table.unbind('mousemove');
		$table.off('mousedown', '.adjust-action');
		$table = null;
		table = null;
		$adjustAction = null;
	});

	it('基础验证', function() {
		expect(Adjust.destroy).toBeDefined();
		expect(Adjust.destroy.length).toBe(1);
	});

	it('验证事件是否消毁成功', function() {
		expect(table.jToolEvent['mouseup']).toBeDefined();
		expect(table.jToolEvent['mouseleave']).toBeDefined();
		expect(table.jToolEvent['mousemove']).toBeDefined();
		expect(table.jToolEvent['mousedown.adjust-action']).toBeDefined();
		Adjust.destroy($table);
		expect(table.jToolEvent['mouseup']).toBeUndefined();
		expect(table.jToolEvent['mouseleave']).toBeUndefined();
		expect(table.jToolEvent['mousemove']).toBeUndefined();
		expect(table.jToolEvent['mousedown.adjust-action']).toBeUndefined();
	});
});
